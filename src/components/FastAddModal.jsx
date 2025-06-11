import { useState, useRef, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import axios from 'axios';

export default function FastAddModal({ isOpen, onClose, onItemAdded }) {
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);
  const csrfRef = useRef(null);

  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const [upc, setUpc] = useState('');
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [expiresAt, setExpiresAt] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      try {
        const { data } = await axios.get('/api/csrf-token', { withCredentials: true });
        csrfRef.current = data.csrfToken;
      } catch {
        setError('Server unavailable');
      }
    })();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    setScanning(true);
    setError('');
    setProduct(null);
    setUpc('');
    setQuantity(1);
    setExpiresAt('');

    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    const stopScanning = () => {
      setScanning(false);
      if (codeReaderRef.current?.reset) codeReaderRef.current.reset();
      codeReaderRef.current = null;

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
        videoRef.current.srcObject = null;
      }
    };

    BrowserMultiFormatReader.listVideoInputDevices()
      .then((devices) => {
        if (!isOpen) return stopScanning();

        let lastId = devices.length ? devices[devices.length - 1].deviceId : null;

        const callback = (result, err) => {
          if (result && !upc) {
            stopScanning();
            setUpc(result.getText());
            lookupProduct(result.getText());
          } else if (err && !err.name.startsWith('NotFoundException')) {
            console.error(err);
            setError('Error accessing camera or scanning');
            stopScanning();
          }
        };

        try {
          if (lastId) {
            codeReader.decodeFromVideoDevice(lastId, videoRef.current, callback);
          } else {
            codeReader.decodeFromVideoDevice(undefined, videoRef.current, callback);
          }
        } catch {
          setError('Unable to access camera');
          stopScanning();
        }
      })
      .catch(() => {
        setError('Unable to access camera');
        setScanning(false);
      });

    return () => {
      if (codeReaderRef.current?.reset) codeReaderRef.current.reset();
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
        videoRef.current.srcObject = null;
      }
      setScanning(false);
    };
  }, [isOpen, upc]);

  async function lookupProduct(scannedUpc) {
    setLoading(true);
    try {
      const token = csrfRef.current;
      const resp = await axios.post(
        '/api/products/by-upc',
        { upc: scannedUpc },
        {
          headers: { 'CSRF-Token': token },
          withCredentials: true,
        }
      );
      setProduct(resp.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('No product found. Please enter details manually.');
        setProduct({ upc: scannedUpc, name: '', brand: '', nutrition: null, id: null });
      } else {
        setError('Error fetching product');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const token = csrfRef.current;
      let productId = product.id;

      if (!productId) {
        const create = await axios.post(
          '/api/products/by-upc',
          {
            upc: product.upc,
            name: product.name,
            brand: product.brand,
            nutrition: product.nutrition,
          },
          {
            headers: { 'CSRF-Token': token },
            withCredentials: true,
          }
        );
        productId = create.data.id;
      }

      const expiresIso = expiresAt ? new Date(expiresAt).toISOString() : null;

      const pantryResp = await axios.post(
        '/api/pantry',
        {
          productId,
          quantity,
          expiresAt: expiresIso,
        },
        {
          headers: { 'CSRF-Token': token },
          withCredentials: true,
        }
      );

      onItemAdded(pantryResp.data);
      onClose();
    } catch {
      setError('Error adding pantry item');
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-4 relative">
        <button
          onClick={() => {
            codeReaderRef.current?.reset();
            onClose();
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:ring-2 focus:ring-blue-600"
        >
          ✕
        </button>

        {!product && (
          <>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Scan a Barcode</h2>
            {error && <p role="alert" className="text-red-600 mb-2">{error}</p>}
            <video ref={videoRef} className="w-full h-64 bg-gray-200" />
            {scanning && <p className="mt-2 text-gray-800">Point your camera at a barcode.</p>}
          </>
        )}

        {product && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Add Pantry Item</h2>
            {error && <p role="alert" className="text-red-600 mb-2">{error}</p>}

            <div>
              <label htmlFor="upc" className="block text-sm font-medium text-gray-800">UPC</label>
              <input
                id="upc"
                type="text"
                value={product.upc}
                disabled
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-800"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-800">Product Name</label>
              <input
                id="name"
                type="text"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-800">Brand</label>
              <input
                id="brand"
                type="text"
                value={product.brand || ''}
                onChange={(e) => setProduct({ ...product, brand: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-800">Quantity</label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div>
              <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-800">Expires At</label>
              <input
                id="expiresAt"
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-700 text-white py-2 px-4 rounded-md disabled:opacity-50"
            >
              {loading ? 'Saving…' : 'Save to Pantry'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
