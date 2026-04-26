import React from "react";
import { FaStar } from "react-icons/fa6";

const travelerStories = [
  {
    id: 1,
    name: "Sophia Turner",
    trip: "Angkor Wat Sunrise Tour",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "Everything felt smooth from pickup to the final stop. The guide shared local stories that made the temples feel alive.",
  },
  {
    id: 2,
    name: "Daniel Kim",
    trip: "Kampot and Kep Escape",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    review:
      "A relaxed, beautiful trip with great pacing. The seafood lunch and sunset views were the highlight of our Cambodia visit.",
  },
  {
    id: 3,
    name: "Ava Patel",
    trip: "Phnom Penh City Discovery",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    review:
      "Perfect for first-time visitors. We saw the major landmarks and still had time to enjoy the city without feeling rushed.",
  },
];

const Team = () => {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Traveler Stories
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
            Guests who left with unforgettable memories
          </h2>
          <p className="mt-4 text-gray-600">
            Real feedback from travelers who explored Cambodia with us, from
            cultural landmarks to relaxed coastal escapes.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {travelerStories.map((story) => (
            <article
              key={story.id}
              className="rounded-3xl border border-gray-100 bg-gradient-to-b from-white to-blue-50/60 p-6 shadow-sm transition hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={story.image}
                  alt={story.name}
                  className="h-16 w-16 rounded-2xl object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {story.name}
                  </h3>
                  <p className="text-sm font-medium text-blue-600">
                    {story.trip}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex gap-1 text-amber-400">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} size={16} />
                ))}
              </div>

              <p className="mt-4 leading-7 text-gray-600">"{story.review}"</p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-blue-600 px-6 py-7 text-center text-white">
            <h3 className="text-3xl font-bold">4.9/5</h3>
            <p className="mt-2 text-blue-100">Average guest satisfaction</p>
          </div>
          <div className="rounded-3xl border border-gray-100 bg-gray-50 px-6 py-7 text-center">
            <h3 className="text-3xl font-bold text-gray-900">2,400+</h3>
            <p className="mt-2 text-gray-500">Verified traveler reviews</p>
          </div>
          <div className="rounded-3xl border border-gray-100 bg-gray-50 px-6 py-7 text-center">
            <h3 className="text-3xl font-bold text-gray-900">92%</h3>
            <p className="mt-2 text-gray-500">Guests who book again or refer</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
