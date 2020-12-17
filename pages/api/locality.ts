import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
) => {
  const { q, lat, lgt } = req.query;
  const apiKey = process.env.MAPBOX_APIKEY;
  const apiEndpoint = q
    ? `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(q as string)}.json?types=place&access_token=${apiKey}`
    : `https://api.mapbox.com/geocoding/v5/mapbox.places/${lgt},${lat}.json?types=place&access_token=${apiKey}`;

  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    res.status(200).json(data.features);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
