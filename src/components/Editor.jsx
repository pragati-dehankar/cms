"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { slugify } from "slugmaster";
import ImageUpload from "./ImageUpload";

export default function Editor({onSave}) {
  const { register, handleSubmit } = useForm();
  const [ogImage,setOgImage]=useState("");
  const [content, setContent] = useState("");
  const handleForm = (data) => {
    const generateSlug=slugify(data.title);
    console.log(data);
    // onSave({...data, slug:generateSlug,content })
    onSave({...data, slug:generateSlug , content,ogImage})
  };
  return (
    <section>
      <form className="space-y-4" onSubmit={handleSubmit(handleForm)}>
        <input
          {...register("title")}
          placeholder="Enter the post title"
          type="text"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
        />
        <ReactQuill 
        value={content}
         onChange={setContent}
         modules={{
            toolbar:[
                [{header:'1'},{header:'2'},{header:'3'}],
                [{size:[]}],
                [
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                ],
            [{list:'ordered'}, {list:'bullet'}],
            ["link","image","code-block"]
            ],
         }}
         formats={[
           "header",
           "font",
           "size",
           "bold",
           "italic",
           "underline",
           "strike",
           "list",
           "bullet",
           "link",
           "image",
           "code-block"
         ]}
          />
        <input
          {...register("excerpt")}
          placeholder="Enter an excerpt"
          type="text"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
        />
        <input
          {...register("category")}
          placeholder="Enter a category"
          type="text"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
        />
        <h2
        className="text-xl font-bold"
        >SEO Data</h2>
        <ImageUpload returnImage={setOgImage}/>
        <input
          {...register("keywords")}
          placeholder="Enter Keywords"
          type="text"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
        />
        <input
          {...register("metaDescription")}
          placeholder="Enter Meta Description"
          type="text"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
        />
        <div className="flex gap-2">
            <select
            {...register("status")}
            className="font-bold text-lg bg-zinc-600 px-3 py-1 rounded-sm outline-none"
            >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Publish</option>

            </select>
            <button
          type="submit"
          className="bg-zinc-800 px-3 py-2 rounded  cursor-pointer"
        >
          Save
        </button>
        </div>
        
      </form>
    </section>
  );
}
