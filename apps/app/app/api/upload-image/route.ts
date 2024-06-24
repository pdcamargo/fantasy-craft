import { NextResponse } from "next/server";

const clientId = process.env.IMGUR_CLIENT_ID;

const headers = {
  Authorization: `Client-ID ${clientId}`,
};

const uploadImageUrl = "https://api.imgur.com/3/image";

export async function POST(request: Request) {
  const formData = await request.formData();

  const img = formData.get("image") as File | string;

  const imgFormData = new FormData();
  imgFormData.append("image", img);
  imgFormData.append("type", typeof img === "string" ? "url" : "file");
  imgFormData.append("title", `Image`);

  const response = await fetch(uploadImageUrl, {
    method: "POST",
    headers,
    body: imgFormData,
  });

  const data = await response.json();

  // return the image link
  return NextResponse.json({
    link: data.data.link,
  });
}
