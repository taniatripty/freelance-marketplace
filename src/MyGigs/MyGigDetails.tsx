import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "@/UseAxios/axios";

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
  totalReviews: number;
  status: string;
  images: string[];
};

const MyGigDetails = () => {
  const { id } = useParams();

  const [gig, setGig] = useState<Gig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await axiosInstance.get(
          `/gigs/${id}`
        );

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
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="text-center py-20">
        Gig not found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow p-6">

        <img
          src={gig.images?.[0]}
          alt={gig.title}
          className="w-full h-96 object-cover rounded-xl"
        />

        <h1 className="text-3xl font-bold mt-6">
          {gig.title}
        </h1>

        <p className="text-gray-500 mt-2">
          {gig.shortDescription}
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="border rounded-xl p-4">
            <p className="text-gray-500">
              Price
            </p>
            <p className="font-bold text-xl">
              ${gig.price}
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-gray-500">
              Rating
            </p>
            <p className="font-bold text-xl">
              ⭐ {gig.rating?.toFixed(1)}
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-gray-500">
              Total Sales
            </p>
            <p className="font-bold text-xl">
              {gig.totalSales}
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-gray-500">
              Reviews
            </p>
            <p className="font-bold text-xl">
              {gig.totalReviews}
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-gray-500">
              Delivery Time
            </p>
            <p className="font-bold text-xl">
              {gig.deliveryDays} Days
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-gray-500">
              Status
            </p>
            <p className="font-bold text-xl">
              {gig.status}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-3">
            Description
          </h2>

          <p className="text-gray-700 leading-8">
            {gig.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyGigDetails;