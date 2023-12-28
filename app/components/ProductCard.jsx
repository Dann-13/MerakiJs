import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ data }) {
    return (
        <div key={data._id} className="group relative">
            <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Image
                    src={data.imageUrl}
                    alt="Product image"
                    className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                    width={300}
                    height={300}
                />
            </div>

            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <Link href={`/product/${data.slug}`}>
                            {data.name}
                        </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {data.categoryName}
                    </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                    ${data.price}
                </p>
            </div>
        </div>
    );
}
