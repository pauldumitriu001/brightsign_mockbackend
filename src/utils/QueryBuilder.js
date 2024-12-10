import { getDatabase, ref, child, get, set } from "firebase/database";

const database = getDatabase();

export default class QueryBuilder {
  constructor(command, path, obj) {
    this.command = command;
    this.path = path;
    this.obj = obj;
  }

  /**
   * Executes the command. Be aware that command string needs to be uppercase
   */
  async execute() {
    switch (this.command) {
      case "C":
        return this.Create();
      case "R":
        return this.Read();
      case "U":
        return this.Update();
      case "D":
        return this.Delete();
      default:
        alert("Invalid Command");
        return;
    }
  }

  async Create() {
    set(ref(database, this.path), this.obj);
    console.log(`${this.obj} Succesfully created at ${this.path}`);
  }

  async Read() {
    const dbRef = ref(database);
    try {
      const snapshot = await get(child(dbRef, this.path));
      if (snapshot.exists()) {
        return Object.values(snapshot.val()); // Convert snapshot to an array
      } else {
        console.log(`No data available on path ${this.path}`);
        return null; // Explicitly return null if no data
      }
    } catch (error) {
      console.error(error);
      return null; // Handle errors gracefully
    }
  }

  async Update() {
    const dbRef = ref(database);
    get(child(dbRef, this.path))
      .then((snapshot) => {
        if (snapshot.exists()) {
          set(ref(database, this.path), this.obj);
          console.log(`Data succesfully updated at  ${this.path}`);
        } else {
          console.log(`No data available on path ${this.path}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async Delete() {
    set(ref(database, this.path), null);
    console.log(`${this.obj} Succesfully deleted at ${this.path}`);
  }
}
