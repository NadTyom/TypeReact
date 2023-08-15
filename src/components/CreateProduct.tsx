import { useState } from "react";
import { IProduct } from "../models";
import axios from "axios";
import Errormessage from "./Errormessage";


const productData: IProduct = {
  title: "",
  price: 13.5,
  description: "lorem ipsum set",
  image: "https://i.pravatar.cc",
  category: "electronic",
  rating: {
    rate: 42,
    count: 10,
  },
};

interface createProductProps{
    onCreate:(product:IProduct)=> void
}


export default function CreateProduct({onCreate}:createProductProps) {
  const [value, setValue] = useState("");
  const [error,setError]= useState("")

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if(value.trim().length === 0){
        setError("Please enter valid title.")
        return
    }
    productData.title = value
   const response = await axios.post<IProduct>("https://fakestoreapi.com/products", productData)
   onCreate(response.data)
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="w-full outline-0 border py-2 px-4 mb-2"
        placeholder="enter product title.."
        value={value}
        onChange={changeHandler}
      />
      {error && <Errormessage error={error}/>}
      <button
        type="submit"
        className="hover:text-white py-2 px-4 border bg-yellow-400"
      >
        Create!
      </button>
    </form>
  );
}
