import React from "react";

const About = () => {
  return (
    <div className="min-h-screen px-6 py-10 
    bg-[radial-gradient(circle_at_center,#8b5a2b_0%,#3d2517_50%,#1a0f0a_100%)] 
    text-[#f2d9a6]">

      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-6">
          About Us
        </h1>

        {/* Intro */}
        <p className=" whitespace-pre-wrap text-lg leading-8 text-start mb-8 text-wrap">
        स्वागतम्,
        <br/>
            मैं पियूष गौड़ पुत्र श्री रवि कुमार गौड़
            <br/>
        एक हिंदी प्रेमी होने के कारण शब्दों से मेरा विशेष लगाव है। इसी कारण मैं अपनी लिखने की कला को आपके साथ साझा कर रहा हूँ।
        <br/>{""}
            यह ‘Piyush Ras’ है— जहाँ मैं भक्ति को गहराई में, देशप्रेम को ऊँचाई में, और समाज को सच्चाई में लिखता हूँ। यहाँ शब्द साधारण नहीं हैं, क्योंकि कुछ भाव आसान होकर अधूरे रह जाते हैं। पियूष रस के कविता रूपी रस को कभी पी लेना तो कभी उसमें भीग जाना...
            <br/>
            <br/>{""}
          कभी भीग जाना तो कभी पी लेना काव्य सरस।
          <br/>{""}
          बरसे बरसे बरसे कविता रूपी पीयूष रस ॥ 
        </p>

        {/* Mission */}
        <div className="bg-[#2b1b14] p-6 rounded-xl mb-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-[#e5d1a8] leading-7">
            
          </p>
        </div>

        {/* Content */}
        <div className="bg-[#2b1b14] p-6 rounded-xl mb-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-3">What You’ll Find</h2>
          <ul className="list-disc pl-5 text-[#e5d1a8] space-y-2">
           
          </ul>
        </div>

        {/* Author */}
        <div className="bg-[#2b1b14] p-6 rounded-xl mb-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-3">About Creator</h2>
          <p className="text-[#e5d1a8] leading-7">
            
           
          </p>
        </div>

        {/* Closing */}
        <p className="text-center text-[#caa56a] mt-10">
         
        </p>

      </div>
    </div>
  );
};

export default About;