import {measure, createAWSBrowser} from 'what-did-i-load';
import {VercelRequest, VercelResponse} from '@vercel/node'

const deviceToViewport = (device: string) => {
  switch (device) {
    case 'iPhone':
      return {width: 375, height: 812, dpr: 2};
    case 'iPad':
      return {width: 768, height: 1024, dpr: 2};
    case 'Desktop':
      return {width: 1280, height: 800, dpr: 1};
    case 'Retina Desktop':
      return {width: 1280, height: 800, dpr: 2};
  }
}

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(403);
  }
  console.log(req.body);
  const {url, device = 'mobile'} = req.body;
  const {width, height, dpr} = deviceToViewport(device);

  res.json(await measure(await createAWSBrowser(width, height, dpr), url));
}