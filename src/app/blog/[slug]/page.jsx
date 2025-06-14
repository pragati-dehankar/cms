import dateFormat from "@/utils/dateFormat";
import { Calendar } from "lucide-react";
import Image from "next/image";

export default function SingleBlog() {
  const tempTags = "SpaceX, Nasa, Exploration";

  const tempHtml = `
  <p>Demo content </p>
  <h2>Test h2 </h2>`;

  return (
    <section>
      <div className="flex items-center flex-col gap-4 ">
        <Image
          className="rounded border w-[90%] md:w-[700px]"
          src="/thumbnails/rVn.jpeg"
          width={500}
          height={250}
          alt="pge"
        />
        <div className="meta-of-a-blog space-y-2 ">
          <div className="flex gap-2 items-center ">
            <Calendar className="text-gray-400 size-4" />
            <p className="text-gray-400 text-xs">
              Created on: {dateFormat(new Date())}
            </p>
          </div>
          <div className="text-xs flex items-center gap-2">
            <p>Category:</p>
            <p className="badge border border-gray-700 w-fit px-2 py-1 rounded bg-gray-600/30">
              Space exploration
            </p>
          </div>
          <div className="text-sm flex items-center gap-2">
            <p>Tags:</p>
            {tempTags.split(",").map((tag) => (
              <p className="badge border border-gray-700 w-fit px-[2px] py-[4px] text-sm rounded bg-gray-600/30">
                {tag}
              </p>
            ))}
          </div>

          {/* <div className="content" dangerouslySetInnerHTML={{__html:tempHtml}}>
       
      </div> */}
          
        </div>
        <p className="text-sm md:w-2/3 w-[90%] text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            impedit error nesciunt non explicabo sapiente? Nulla ducimus labore
            officiis accusantium earum recusandae voluptatem velit aliquid natus
            odit reprehenderit laborum, quaerat rem iure optio quos ipsam
            sapiente blanditiis id quis exercitationem sint! Facilis quas animi
            pariatur fugiat? Tempore, quis quae? Officiis voluptate nam ratione
            officia consequuntur vero rerum porro maiores<br/> accusamus cum
            repudiandae tenetur, ipsa, unde veniam hic vitae accusantium, sint
            ad blanditiis neque laudantium. Libero accusantium aspernatur quam
            deserunt beatae blanditiis, odio ipsa praesentium labore eum hic
            quibusdam incidunt rerum reiciendis explicabo dolorum laboriosam.
            Ducimus iusto cum sint nam blanditiis <br/>quae quibusdam delectus quam
            laboriosam aspernatur, necessitatibus est odit saepe quod,
            voluptatem ipsam aliquam repudiandae magni eum hic officiis? Amet
            optio delectus vitae et exercitationem magni, a, odio magnam,
            impedit accusantium repellendus nesciunt? Nemo, fugiat neque.
            Maiores sunt voluptatibus sint<br/> deleniti ipsam aspernatur! Aut, natus
            dignissimos ipsam recusandae commodi impedit hic voluptatibus, nemo
            in cumque porro odit aspernatur saepe facilis totam obcaecati,
            perspiciatis sed sapiente. Explicabo consequuntur natus cupiditate
            ducimus dolorem maiores hic aut animi in corrupti, expedita iste
            quas obcaecati? Rem numquam hic magnam dolores veniam adipisci
            blanditiis omnis in, corporis amet accusamus odio dolorum voluptates
            vitae quia doloremque.
          </p>
      </div>
    </section>
  );
}
