import { useState } from "react";

export default function AiRecipeSuggest() {
  const [useSpoiling, setUseSpoiling] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recipe, setRecipe] = useState(null);

  const suggestMeal = async () => {
    setLoading(true);
    setError("");
    setRecipe(null);

    try {
      const res = await fetch(
        `/api/ai/recipe?useSpoiling=${useSpoiling}`,
        {
          credentials: "include" // send the JWT cookie
        }
      );
      if (!res.ok) {
        const { error: msg } = await res.json();
        throw new Error(msg || res.statusText);
      }
      const data = await res.json();
      setRecipe(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex items-center mb-4">
        <label className="inline-flex items-center mr-4">
          <input
            type="checkbox"
            checked={useSpoiling}
            onChange={() => setUseSpoiling(!useSpoiling)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Use soon-to-spoil items</span>
        </label>
        <button
          onClick={suggestMeal}
          disabled={loading}
          className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Suggesting…" : "Suggest meal"}
        </button>
      </div>

      {error && (
        <div className="text-red-600 mb-4">
          Error: {error}
        </div>
      )}

      {recipe && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{recipe.recipeName}</h2>

          <div>
            <h3 className="font-medium">Ingredients:</h3>
            <ul className="list-disc list-inside">
              {recipe.ingredients.map((ing) => (
                <li key={ing.name}>
                  {ing.name}: {ing.quantity}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium">Steps:</h3>
            <ol className="list-decimal list-inside space-y-1">
              {recipe.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="font-medium">Nutrition Breakdown:</h3>
            <p>
              <strong>Total Calories:</strong> {recipe.nutritionBreakdown.totalCalories} kcal  
              &nbsp;|&nbsp;
              <strong>Total Protein:</strong> {recipe.nutritionBreakdown.totalProtein} g
            </p>
            <ul className="list-disc list-inside mt-2">
              {recipe.nutritionBreakdown.perIngredient.map((n) => (
                <li key={n.name}>
                  {n.name}: {n.calories} kcal, {n.protein} g protein
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
