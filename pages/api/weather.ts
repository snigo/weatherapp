import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';
import { WeatherStatus } from '../../types';
import { mapApiResponse } from '../../utils';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<WeatherStatus | { error: unknown }>,
) => {
  const { location } = req.query;
  const apiKey = process.env.OPENWEATHERMAP_APIKEY;
  const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    res.status(200).json(mapApiResponse(data));
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
