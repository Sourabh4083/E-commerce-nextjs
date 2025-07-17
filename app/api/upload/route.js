import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req) {
  try {
    const data = await req.formData()
    const file = data.get('image')

    if (!file) {

      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const b64 = buffer.toString('base64')
    const dataURI = `data:${file.type};base64,${b64}`


    const uploadRes = await cloudinary.uploader.upload(dataURI)

    return NextResponse.json({ url: uploadRes.secure_url })

  } catch (err) {
    console.error("❌ Cloudinary upload error:", err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
