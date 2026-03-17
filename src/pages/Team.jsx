import React from "react";

const teamMembers = [
  {
    id: 1,
    name: "Sok Dara",
    role: "Founder & CEO",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    desc: "Passionate traveler with 10+ years of experience in tourism.",
  },
  {
    id: 2,
    name: "Chantha Srey",
    role: "Tour Manager",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    desc: "Expert in organizing unforgettable group tours.",
  },
  {
    id: 3,
    name: "Vannak Kim",
    role: "Senior Guide",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    desc: "Local guide who knows Cambodia’s hidden gems.",
  },
  {
    id: 4,
    name: "Davy Lin",
    role: "Customer Support",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    desc: "Always ready to assist travelers 24/7.",
  },
];

const Team = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-6">Meet Our Team</h1>

      <p className="text-center text-gray-600 mb-12">
        Our dedicated professionals work hard to make your journey safe,
        enjoyable, and unforgettable.
      </p>

      {/* Team Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-28 h-28 mx-auto rounded-full mb-4 object-cover"
            />

            <h3 className="text-xl font-semibold">{member.name}</h3>

            <p className="text-blue-600 font-medium mb-2">{member.role}</p>

            <p className="text-gray-600 text-sm">{member.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
