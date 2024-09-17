const uploadImage = async ({ file }) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "threads");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/deq6ikdw8/image/upload`, // Replace 'your_cloud_name' with your Cloudinary cloud name
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return data;
};

export { uploadImage };
