// Number of objects in each fam
export const FAMS_SIZE: number[] = [1, 2, 4, 6];

// Minimum accuracy required to complete each fam
export const FAMS_REQUIRED_ACCURACY: number[] = [100, 75, 63, 61];

// Seed yoked session
export const SEED_YOKED_SESSION = {
    uid: "seed",
    objects: ["clown", "cup", "cupcake", "dog", "doll", "door"],
    history: [
      {time: 1000, id: "clown", action: "show"},
      {time: 2000, id: "clown", action: "hide"},
      {time: 3000, id: "cup", action: "show"},
      {time: 4000, id: "cup", action: "hide"},
      {time: 5000, id: "cupcake", action: "show"},
      {time: 6000, id: "cupcake", action: "hide"},
      {time: 7000, id: "dog", action: "show"},
      {time: 8000, id: "dog", action: "hide"},
      {time: 9000, id: "doll", action: "show"},
      {time: 10000, id: "doll", action: "hide"},
      {time: 11000, id: "door", action: "show"},
      {time: 12000, id: "door", action: "hide"}
    ]
  };

export const N_OBJECTS_TEST: number = 6;

export const CONDITIONS = [];