import cloudinary from 'cloudinary'
import { server } from 'config'
import { IncomingForm } from 'formidable'
import { IncomingMessage } from 'http'
import { getTokenFromServerCookie } from 'lib/auth'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function upload(
  req: IncomingMessage,
  res: {
    json: (arg0: { message: string }) => any
    status: (arg0: number) => { (): any; new (): any; send: { (arg0: string): any; new (): any } }
  },
) {
  if (req.method === 'POST') {
    const data: any = await new Promise((resolve, reject) => {
      const form = new IncomingForm()

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err)
        resolve({ fields, files })
      })
    })
    const file = data?.files?.inputFile.filepath
    const { user_id } = data.fields
    try {
      const response = await cloudinary.v2.uploader.upload(file, {
        public_id: user_id,
      })
      const { public_id } = response
      const jwt = getTokenFromServerCookie(req as IncomingMessage & { cookies: Partial<{ [key: string]: string }> })
      const userResponse = await fetch(`${server}/users/${user_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          avatar: public_id,
        }),
      })
      const data = await userResponse.json()
      return res.json({ message: 'success' })
    } catch (error) {
      console.error(JSON.stringify(error))
    }
  } else {
    return res.status(403).send('Forbidden')
  }
}
