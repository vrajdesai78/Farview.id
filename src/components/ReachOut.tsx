import React from "react";
import Grid from "./Grid/Grid";

const ReachOut = () => {
  const links = [
    {
      icon: "/twitter.svg",
      url: "https://twitter.com/tusharrvrma",
    },
    {
      icon: "/reddit.svg",
      url: "https://twitter.com/tusharrvrma",
    },
    {
      icon: "/discord.svg",
      url: "https://twitter.com/tusharrvrma",
    },
    {
      icon: "/instagram.svg",
      url: "https://twitter.com/tusharrvrma",
    },
    {
      icon: "/twitter.svg",
      url: "https://twitter.com/tusharrvrma",
    },
  ];
  return (
    <Grid heading="Follow & Reach out">
      <div className="w-full flex items-center justify-center gap-8 lg:gap-12 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        {links.map((link: any, id: number) => {
          return (
            <a
              className="flex items-center justify-center"
              href={link.url}
              key={id}
              target="_blank"
            >
              <img
                src={link.icon}
                alt=""
                className="md:w-8 w-5 md:h-8 h-5 rounded-lg"
              />
            </a>
          );
        })}
      </div>
    </Grid>
  );
};

export default ReachOut;
