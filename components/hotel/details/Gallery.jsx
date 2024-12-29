import Image from "next/image";

const Gallery = ({ gallery }) => {
  const newImageGall = [...gallery];
  newImageGall.shift();
  console.log(newImageGall);

  return (
    <section className="container">
      <div className="grid grid-cols-2 imageshowCase">
        <Image
          src={gallery[0] || "/1.png"}
          className="h-[400px]"
          alt="Main pic"
          width={600}
          height={600}
          quality={100}
        />

        <div className="grid grid-cols-2 grid-rows-2 h-[400px]">
          {newImageGall.map((img, i) => (
            <Image
              src={img || `/${i + 1}.png`}
              key={img}
              alt="sub pic"
              width={400}
              height={400}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
