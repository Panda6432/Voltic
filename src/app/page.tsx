import React from 'react';

// Importing the sections from the "sections" folder
// Note: Ensure the function names inside these files match what you import, 
// or if they are "export default", you can name them whatever you want here.
import VolticSection1 from './sections/homesection1'; 
import VolticSection2 from './sections/homesection2';
import VolticSection3 from './sections/homesection3';
import VolticSection4 from './sections/homesection4';
import VolticSection5 from './sections/homesection5'; 
import VolticSection6 from './sections/homesection6';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-x-hidden bg-black text-white">
      
      {/* Section 1: Hero / Introduction */}
      <section className="w-full">
        <VolticSection1 />
      </section>

      {/* Section 2: Can Showcase / Flavor */}
      <section className="w-full">
        <VolticSection2 />
      </section>

      {/* Section 3: Features / Ingredients */}
      <section className="w-full">
        <VolticSection3 />
      </section>
      {/* Section 4: Call to Action / Purchase */}
      <section className="w-full">
        <VolticSection4 />
      </section>
      {/* Section 5: Scrollable Cards / More Info */}
      <section className="w-full">
        <VolticSection5 />
      </section>
      {/* Section 6: Events / Community */}
      <section className="w-full">
        <VolticSection6 />
      </section>



    </main>
  );
}