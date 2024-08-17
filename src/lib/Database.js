import EventEmitter from "EventEmitter";

class Database extends EventEmitter {
  constructor() {
    super();
    this.track = {};
    this.records = [];
  }
  static init() {
    const newDatabase = new Database();
    newDatabase.on("newRecord", (recordData) =>
      newDatabase.newRecord(recordData)
    );
    newDatabase.on("setBucket", ({ uuid, no }) =>
      newDatabase.setBucket({ uuid, no })
    );
    return newDatabase;
  }
  newRecord(recordData) {
    this.track[recordData.uuid] = recordData;
  }
  setBucket({ uuid, no }) {
    const record = this.track[uuid];
    record.bucketNo = no;
    delete this.track[record.uuid];
    this.records.push(record);
  }
}

export default Database;
