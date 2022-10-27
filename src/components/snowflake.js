import SnowflakeId from "snowflake-id";
var userFlake = new SnowflakeId({
  mid: 2119518,
  offset: (2019 - 1970) * 31536000 * 1000,
});
var setFlake = new SnowflakeId({
  mid: 19520,
  offset: (2019 - 1970) * 31536000 * 1000,
});
var noteFlake = new SnowflakeId({
  mid: 1415205,
  offset: (2019 - 1970) * 31536000 * 1000,
});

export { userFlake, setFlake, noteFlake };
