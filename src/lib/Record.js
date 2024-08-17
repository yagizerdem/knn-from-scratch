class Record {
  constructor({ uuid, x, y, bounciness, radius, bucketNo = null }) {
    this.uuid = uuid;
    this.x = x;
    this.y = y;
    this.bounciness = bounciness;
    this.radius = radius;
    this.bucketNo = bucketNo;
  }
}

export default Record;
