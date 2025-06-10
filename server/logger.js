import morgan from 'morgan';

/**
 * Morgan format string that emits ONE line of JSON.
 *  - severity defaults to INFO
 *  - message is the concise method+url+status+time
 *  - httpRequest block gives Cloud Logging extra fields
 */
export default morgan((tokens, req, res) => {
  const severity = tokens.status(req, res) >= 500 ? 'ERROR' : 'INFO';
  return JSON.stringify({
    severity,
    message: `${tokens.method(req, res)} ${tokens.url(req, res)} ${tokens.status(req, res)} ${tokens['response-time'](req, res)}ms`,
    httpRequest: {
      requestMethod:  tokens.method(req, res),
      requestUrl:     tokens.url(req, res),
      status:         Number(tokens.status(req, res)),
      responseSize:   Number(tokens.res(req, res, 'content-length') || 0),
      userAgent:      req.headers['user-agent'] || '',
      remoteIp:       req.ip,
      latency:        `${tokens['response-time'](req, res)}ms`,
    },
  });
});
