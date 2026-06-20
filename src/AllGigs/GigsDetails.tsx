import axiosInstance from "@/UseAxios/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

type Gig = {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  price: number;
  deliveryDays: number;
  revisions: number;
  rating: number;
  totalSales: number;
  tags: string[];
  features: string[];
  images: string[];
  name: string;
  email: string;
};

const GigDetails = () => {
  const { id } = useParams();

  const [gig, setGig] = useState<Gig | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await axiosInstance.get(`/gigs/${id}`);
        setGig(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGig();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!gig) {
    return <div className="text-center py-20">Gig not found</div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold">{gig.title}</h1>

            <p className="mt-3 text-slate-600">{gig.shortDescription}</p>

            {/* MAIN IMAGE */}
            <div className="mt-6">
              <img
                src={gig.images?.[activeImage]}
                alt={gig.title}
                className="w-full h-[500px] object-cover rounded-2xl"
              />
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 mt-4">
              {gig.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  onClick={() => setActiveImage(index)}
                  className={`w-24 h-20 rounded-lg object-cover cursor-pointer border-2 ${
                    activeImage === index
                      ? "border-indigo-600"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>

            {/* DESCRIPTION */}
            <div className="bg-white rounded-2xl p-6 mt-8">
              <h2 className="text-2xl font-bold mb-4">About This Gig</h2>

              <p className="text-slate-700 leading-8">{gig.description}</p>
            </div>

            {/* FEATURES */}
            <div className="bg-white rounded-2xl p-6 mt-6">
              <h2 className="text-2xl font-bold mb-4">Features</h2>

              <ul className="space-y-2">
                {Array.isArray(gig.features) &&
                  gig.features.map((feature, index) => (
                    <li key={index}>✅ {feature}</li>
                  ))}
              </ul>
            </div>

            {/* TAGS */}
            <div className="bg-white rounded-2xl p-6 mt-6">
              <h2 className="text-2xl font-bold mb-4">Skills & Tags</h2>

              <div className="flex flex-wrap gap-3">
                {Array.isArray(gig.tags) &&
                  gig.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div>
            <div className="bg-white rounded-2xl p-6 sticky top-5 border">
              <h2 className="text-4xl font-bold text-green-600">
                ${gig.price}
              </h2>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{gig.deliveryDays} Days</span>
                </div>

                <div className="flex justify-between">
                  <span>Revisions</span>
                  <span>{gig.revisions}</span>
                </div>

                <div className="flex justify-between">
                  <span>Rating</span>
                  <span>⭐ {gig.rating || 0}</span>
                </div>

                <div className="flex justify-between">
                  <span>Total Sales</span>
                  <span>{gig.totalSales || 0}</span>
                </div>
              </div>

              <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700">
                Continue (${gig.price})
              </button>
            </div>

            {/* SELLER */}
            <div className="bg-white rounded-2xl p-6 mt-6">
              <h2 className="text-xl font-bold">Seller Information</h2>

              <div className="mt-4">
                <h3 className="font-semibold text-lg">{gig.name}</h3>

                <p className="text-slate-500">{gig.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigDetails;
