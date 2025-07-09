"use client";
import React from "react";

const memories = [
  {
    title: "GC Retreat",
    url: "https://photos.app.goo.gl/yf42CEijYYvMBnaE9",
    image: "https://lh3.googleusercontent.com/pw/AP1GczMbrHdxn8pmdfxxmdiAJCP6fs9y3D47CtPFKUy4kEE72A5Bedvm1jq0Jq7WZpvNi5Ixj3t9dSxEq5-FpfEpowaz93iD-rjN3Cbs5W8NSfz_Lg4V08fKHvCBk6iiic9E8h491IOfYUYhy957c4Bvnss=w1280-h853-s-no-gm?authuser=1", 
  },
  {
    title: "Culture Day",
    url: "https://photos.app.goo.gl/uHaRau19MDJ9p9YG8",
    image: "https://lh3.googleusercontent.com/pw/AP1GczMBFMnT6mvSiXv9vIUfQg7kHeSzINwn1w4TOFYF-wrC5wyD-EHtdyoCc3lPSQ0cC8oCgHuhpvDqAoXTweEq9mdyf1S3o7V3XhbEEOiSr0Rsy3wWt7B7wHEP1o5ELjasq9mJysr7WPLp_Y8a8G5tZy3W=w1196-h897-s-no-gm?authuser=1", 
  },
  {
    title: "Fellowship Farewell ",
    url: "https://photos.app.goo.gl/wS8XZFvpif7xRs517",
    image: "https://lh3.googleusercontent.com/pw/AP1GczNdF5f5mSnvLzkiTN8CMgRVzxe0s_917pWfBAMBm3iJzbKkGWRJej59tMS9QMsMJ83lWPHmW4UkUV26YoCo9YSHkFmwHsFkX5_cNQYj7TWnTSsYIePLXtfSKFv1jFnCJz0q8srWXujZST7asyHdQqpk=w1196-h897-s-no-gm?authuser=1", 
  },
   {
    title: "GC Dinner",
    url: "https://photos.app.goo.gl/yiXuJAxhFt8d66Jt8",
    image: "https://lh3.googleusercontent.com/pw/AP1GczPafKEuPOU9Y2YWKLfGdtA-i6KqhGkLkq9pegFMKmz0jdCEVg-Irgw526xq0zntqhtRgWjX2XLdtu9sRstxumcIxs3jczj17Dr5M3YqJMoElR7N5-qcRMiFqL0NGKLscrQ8vAhxz9nGEcPcClbBm4eH=w1346-h897-s-no-gm?authuser=0", 
  },
];

export default function MemoriesSection() {
  return (
    <div className="px-4 py-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold text-center mb-10 text-blue-700">
        Our Memories Together
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {memories.map(({ title, url, image }) => (
          <a
            key={title}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-lg border border-blue-300 bg-white dark:bg-gray-800 p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-center h-48 mb-4 rounded-md bg-blue-100 dark:bg-blue-900 overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt={title}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-blue-600">
                  No Image Available
                </div>
              )}
            </div>
            <h3 className="text-lg font-semibold text-center text-blue-700 dark:text-blue-300 group-hover:text-blue-900 dark:group-hover:text-blue-400">
              {title}
            </h3>
          </a>
        ))}
      </div>
    </div>
  );
}
