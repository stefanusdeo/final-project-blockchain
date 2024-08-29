"use client";
import Image from "next/image";
import ImageOne from "@/assets/image/image2.jpg";
import { useRef, useState } from "react";
import { connectMetamask } from "@/utils/connectMetamask";
import { createDigitalIdentity } from "@/utils/fetchSmartContract";
import { toast } from "sonner";
import DatePicker from "react-datepicker";
import { formattedDate } from "@/utils/formater";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  no: Yup.number().required("No ID is required").min(1, "Invalid Id"),
  name: Yup.string().required("Name is required"),
  placeOfBirth: Yup.string().required("Place of birth is required"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
});

export default function Home() {
  const router = useRouter();
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [date, setDate] = useState("");

  const accountChange = (accountName) => {
    setDefaultAccount(accountName);
  };

  const handleConnectWallet = async (event) => {
    event.preventDefault();
    const res = await connectMetamask();

    if (res.success) {
      accountChange(res.address);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {
      ...values,
      dateOfBirth: formattedDate(values.dateOfBirth),
    };
    const res = await createDigitalIdentity(data);
    if (res.success) {
      toast.success(res.message);
      setTimeout(() => {
        router.push("https://property-ownership.vercel.app/");
      }, 2000);
    } else {
      toast.error(res.message);
    }
    setSubmitting(false);
  };

  return (
    <main className="">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen items-center justify-center">
        <div className="flex justify-center items-center">
          <Image src={ImageOne} alt="Identity" className="w-[500px]" />
        </div>
        <div className="p-4 d-flex justify-center items-center w-full h-fit">
          <div className="my-2">
            <h2 className="font-semibold text-[#00b4d8] text-center text-lg">
              Create Digital Identity
            </h2>
            <p className="text-center text-[#0077b6] font-normal">
              Your identity will be stored in the blockchain
            </p>
            <p className="text-center text-[#0077b6] font-normal">
              {defaultAccount}
            </p>
          </div>
          <Formik
            initialValues={{
              no: "",
              name: "",
              placeOfBirth: "",
              dateOfBirth: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, errors }) => (
              <Form className="flex flex-col space-y-5">
                <div className="border border-[#00b4d8] rounded-2xl p-2">
                  <Field
                    className="w-full focus:outline-none focus:border-none"
                    placeholder="No ID"
                    name="no"
                  />
                </div>
                <ErrorMessage
                  name="no"
                  component="span"
                  className="text-red-500 text-sm"
                />
                <div className="border border-[#00b4d8] rounded-2xl p-2">
                  <Field
                    className="w-full focus:outline-none focus:border-none"
                    placeholder="Name"
                    name="name"
                  />
                </div>
                <ErrorMessage
                  name="name"
                  component="span"
                  className="text-red-500 text-sm"
                />
                <div className="border border-[#00b4d8] rounded-2xl p-2">
                  <Field
                    className="w-full focus:outline-none focus:border-none"
                    placeholder="Place of birth"
                    name="placeOfBirth"
                  />
                </div>
                <ErrorMessage
                  name="placeOfBirth"
                  component="span"
                  className="text-red-500 text-sm"
                />
                <div className="border border-[#00b4d8] rounded-2xl p-2">
                  <DatePicker
                    className="w-full focus:outline-none focus:border-none"
                    selected={date}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    onChange={(date) => {
                      setFieldValue("dateOfBirth", date);
                      setDate(date);
                    }}
                    placeholderText="Date of Birth"
                  />
                </div>
                <ErrorMessage
                  name="dateOfBirth"
                  component="span"
                  className="text-red-500 text-sm"
                />
                <div className="flex gap-2">
                  {!defaultAccount && (
                    <button
                      className="bg-[#00b4d8] text-white p-2 w-full rounded-xl"
                      onClick={handleConnectWallet}
                    >
                      Connect Wallet
                    </button>
                  )}
                  <button
                    className="bg-[#0077b6] text-white p-2 w-full rounded-xl disabled:bg-slate-400"
                    disabled={!defaultAccount || isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? "Loading..." : "Create"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
}
