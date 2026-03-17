const assert = require("assert");

const RATED_CAPACITY = 120;

function countBatteriesByHealth(presentCapacities) {
  let healthy = 0;
  let exchange = 0;
  let failed = 0;

  const healthyThreshold = 0.83 * RATED_CAPACITY; 
  const exchangeThreshold = 0.63 * RATED_CAPACITY; 

  for (const capacity of presentCapacities) {
    if (capacity > healthyThreshold) {
      healthy++;
    } else if (capacity >= exchangeThreshold) {
      exchange++;
    } else {
      failed++;
    }
  }

  return { healthy, exchange, failed };
}

function testBucketingByHealth() {
  console.log("Counting batteries by SoH...");
  const presentCapacities = [113, 116, 80, 95, 92, 70];

  const counts = countBatteriesByHealth(presentCapacities);

  assert(counts.healthy === 2);
  assert(counts.exchange === 3);
  assert(counts.failed === 1);

  console.log("Done counting :)");
}

function testBoundaryConditions() {
  console.log("Testing boundaries...");

  let c = countBatteriesByHealth([99.6]); 
  assert(c.exchange === 1);

  c = countBatteriesByHealth([75.6]);
  assert(c.exchange === 1);

  c = countBatteriesByHealth([99.7]);
  assert(c.healthy === 1);

  c = countBatteriesByHealth([75.5]);
  assert(c.failed === 1);

  c = countBatteriesByHealth([]);
  assert(c.healthy === 0 && c.exchange === 0 && c.failed === 0);

  console.log("Boundaries look good :)");
}

testBucketingByHealth();
testBoundaryConditions();
