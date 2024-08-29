"use client";
import { registerProperty } from "@/utils/api/regisFetch";
import { encryptToBytes32 } from "@/utils/hashChar";
import { useAccountAddress } from "@/zustand/addressStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function page() {
  const router = useRouter();

  const accountAddress = useAccountAddress((state) => state.accountAddress);

  const [image, setImage] = useState(null);
  const [address, setAddress] = useState("");
  const [luasBangunan, setLuasBangunan] = useState("");
  const [luasTanah, setLuasTanah] = useState("");
  const [errors, setErrors] = useState({});
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [nib, setNib] = useState("");
  const [sertifNum, setSertifNum] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loadingFetch, setLoadingFetch] = useState(false);

  const fetchData = async (e) => {
    setLoadingFetch(true);
    if (image) {
      try {
        const formData = new FormData();
        formData.append("file", image);

        const resFile = await fetch(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_J}`,
            },
            body: formData,
          }
        );
        const response = await resFile.json();

        const ImgHash = `${response.IpfsHash}`;

        const data = {
          urlPhoto: ImgHash,
          locationAddress: encryptToBytes32(address),
          buildingArea: parseInt(luasBangunan),
          landArea: parseInt(luasTanah),
          postalCode: encryptToBytes32(postalCode),
          city: encryptToBytes32(city),
          province: encryptToBytes32(province),
          nib: encryptToBytes32(nib),
          sertificateNumber: encryptToBytes32(sertifNum),
          subdistrict: encryptToBytes32(kecamatan),
        };
        const res = await registerProperty(data);
        if (!res.success) {
          toast.error(`${res.message}`);
          if (res.message === "Please Register your identity") {
            setTimeout(() => {
              router.push("https://dapp-project-silk.vercel.app/");
            }, 2000);
          }
          return;
        }
        toast.success(`${res.message}`);

        setTimeout(() => {
          router.push("/owned-property");
        }, 1000);

        //Take a look at your Pinata Pinned section, you will see a new file added to you list.
      } catch (error) {
        toast.error("Error sending File to IPFS");
        console.log(error);
        setLoadingFetch(false);
      }
    }
    setLoadingFetch(true);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!image) newErrors.image = "Image is required";
    if (!address) newErrors.address = "Address is required";
    if (!city) newErrors.city = "City is required";
    if (!kecamatan) newErrors.kecamatan = "Subdistrict is required";
    if (!province) newErrors.province = "Province is required";
    if (!luasBangunan || isNaN(luasBangunan) || luasBangunan <= 0)
      newErrors.luasBangunan = "Building Area must be a positive number";
    if (!postalCode || isNaN(postalCode) || postalCode <= 0)
      newErrors.luasBangunan = "Invalid Postal Code";
    if (!luasTanah || isNaN(luasTanah) || luasTanah <= 0)
      newErrors.luasTanah = "Land Area must be a positive number";
    if (!nib || isNaN(nib) || nib <= 0)
      newErrors.nib = "Land Area must be a positive number";
    if (!sertifNum || isNaN(sertifNum) || sertifNum <= 0)
      newErrors.sertifNum = "Land Area must be a positive number";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // Handle form submission
      await fetchData();
      // console.log({ image, address, luasBangunan, luasTanah });
      // alert("coming soon");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "Image is required",
      }));
      return;
    }
    if (!file.type.startsWith("image/")) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "File must be an image",
      }));
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "Image size must be less than 2MB",
      }));
      return;
    }
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors((prevErrors) => ({ ...prevErrors, image: null }));
  };
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="bg-gray-100 p-8 rounded-lg  w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-500">
            Register Property
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-5">
                <label className="block text-gray-700 mb-1">
                  Certificate Number
                </label>
                <input
                  type="number"
                  name="sertifNum"
                  value={sertifNum}
                  onChange={(event) => setSertifNum(event.target.value)}
                  className="block w-full text-gray-700 border rounded py-2 px-3"
                  placeholder="Certificate Number"
                />
                {errors.sertifNum && (
                  <div className="text-red-600 mt-1">{errors.sertifNum}</div>
                )}
              </div>
              <div className="mb-5">
                <label className="block text-gray-700 mb-1">NIB</label>
                <input
                  type="number"
                  name="nib"
                  value={nib}
                  onChange={(event) => setNib(event.target.value)}
                  className="block w-full text-gray-700 border rounded py-2 px-3"
                  placeholder="NIB"
                />
                {errors.nib && (
                  <div className="text-red-600 mt-1">{errors.nib}</div>
                )}
              </div>
              <div className="mb-5">
                <label className="block text-gray-700 mb-1">Upload Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="block w-full text-gray-700 border rounded py-2 px-3"
                />
                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded"
                    />
                  </div>
                )}
                {errors.image && (
                  <div className="text-red-600 mt-1">{errors.image}</div>
                )}
              </div>
              <div className="mb-5">
                <label className="block text-gray-700 mb-1">Address</label>
                <textarea
                  rows={4}
                  name="address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="Address"
                  className="block w-full text-gray-700 border rounded py-2 px-3"
                />
                {errors.address && (
                  <div className="text-red-600 mt-1">{errors.address}</div>
                )}
              </div>
              <div className="mb-5">
                <label className="block text-gray-700 mb-1">Subdistrict</label>
                <input
                  type="text"
                  name="subdistrict"
                  value={kecamatan}
                  onChange={(event) => setKecamatan(event.target.value)}
                  className="block w-full text-gray-700 border rounded py-2 px-3"
                  placeholder="Subdistrict"
                />
                {errors.kecamatan && (
                  <div className="text-red-600 mt-1">{errors.kecamatan}</div>
                )}
              </div>
              <div className="mb-5">
                <label className="block text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  className="block w-full text-gray-700 border rounded py-2 px-3"
                  placeholder="City"
                />
                {errors.city && (
                  <div className="text-red-600 mt-1">{errors.city}</div>
                )}
              </div>
              <div className="mb-5">
                <label className="block text-gray-700 mb-1">Province</label>
                <input
                  type="text"
                  name="province"
                  value={province}
                  onChange={(event) => setProvince(event.target.value)}
                  className="block w-full text-gray-700 border rounded py-2 px-3"
                  placeholder="Province"
                />
                {errors.province && (
                  <div className="text-red-600 mt-1">{errors.province}</div>
                )}
              </div>
              <div className="mb-5">
                <label className="block text-gray-700 mb-1">Postal Code</label>
                <input
                  type="number"
                  name="postalCode"
                  value={postalCode}
                  onChange={(event) => setPostalCode(event.target.value)}
                  className="block w-full text-gray-700 border rounded py-2 px-3"
                  placeholder="Postal Code"
                />
                {errors.postalCode && (
                  <div className="text-red-600 mt-1">{errors.postalCode}</div>
                )}
              </div>
              <div className="mb-5">
                <label className="block text-gray-700 mb-1">
                  Building Area (m²)
                </label>
                <input
                  type="number"
                  name="luasBangunan"
                  value={luasBangunan}
                  onChange={(event) => setLuasBangunan(event.target.value)}
                  className="block w-full text-gray-700 border rounded py-2 px-3"
                  placeholder="Building Area"
                />
                {errors.luasBangunan && (
                  <div className="text-red-600 mt-1">{errors.luasBangunan}</div>
                )}
              </div>
              <div className="mb-5">
                <label className="block text-gray-700 mb-1">
                  Surface Area (m²)
                </label>
                <input
                  type="number"
                  name="luasTanah"
                  value={luasTanah}
                  onChange={(event) => setLuasTanah(event.target.value)}
                  className="block w-full text-gray-700 border rounded py-2 px-3"
                  placeholder="Surface Area"
                />
                {errors.luasTanah && (
                  <div className="text-red-600 mt-1">{errors.luasTanah}</div>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-800 hover:shadow-xl transition-colors disabled:bg-gray-300"
                disabled={accountAddress === "" || loadingFetch === true}
              >
                {loadingFetch ? "Loading..." : `Register`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
