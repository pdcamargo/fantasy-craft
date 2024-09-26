"use client";

import { faker } from "@faker-js/faker";

import { createWorld } from "@/lib/actions/worlds.action";

export const CreateWorldButton = () => {
  return (
    <button
      onClick={() => {
        createWorld({ name: faker.company.name() }).then((world) => {
          console.log(world);
        });
      }}
    >
      Create world
    </button>
  );
};
