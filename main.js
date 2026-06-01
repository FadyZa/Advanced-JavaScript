// --1 Custom Map

function customMap(nums, fn) {
  let newArr = [];
  for (let num of nums) {
    newArr.push(fn(num));
  }
  return newArr;
}

const nums = [1, 2, 3];
const result = customMap(nums, function (x) {
  return x * 2;
});

// console.log(result);

// /////////////////////////////////////////////////////////////////////////////////////////////

// --2 Custom Filter

function customFilter(users, fn) {
  let newArr = [];
  for (const user of users) {
    const res = fn(user.age);
    if (res) {
      newArr.push(user);
    }
  }
  return newArr;
}

const users = [
  { name: "Ahmed", age: 22 },
  { name: "Sara", age: 15 },
  { name: "ali", age: 19 },
  { name: "mohsen", age: 22 },
];

// return adults only
const filterResult = customFilter(users, function (age) {
  return age >= 18;
});

// console.log(filterResult);

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////

// --3 Custom Reduce

function customReduce(numbers, fn, acc) {
  let total = acc;

  for (const num of numbers) {
    total += num;
  }

  return total;
}

const reduceResult = customReduce(
  [1, 2, 3],
  function (acc, current) {
    return acc + current;
  },
  10,
);

// console.log(reduceResult);

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////

// --4 Group By

function groupBy(arr, prop) {
  let newObj = {};
  for (const element of arr) {
    if (Object.hasOwn(newObj, element[prop])) {
      newObj[element[prop]].push(element);
    } else {
      newObj[element[prop]] = [element];
    }
  }

  return newObj;
}

const employees = [
  { name: "Ahmed", role: "admin" },
  { name: "Sara", role: "user" },
  { name: "Ali", role: "admin" },
  { name: "Mona", role: "user" },
  { name: "Fady", role: "guest" },
];

const groupResult = groupBy(employees, "role");

// console.log(groupResult);

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////

// --5 DeepClone
// (recursion)

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////

// --6 once

function sayHello() {
  console.log("Hello");
}

function once(fn) {
  let called = false;
  return function () {
    if (!called) {
      called = true;
      fn();
    }
  };
}

const init = once(sayHello);

// init();
// init();
// init();

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////

// --6 memorize

function memorize(fn) {
  const cache = new Map();

  return function (value) {
    if (cache.has(value)) {
      return cache.get(value) + " (From Cache)";
    }

    const result = fn(value);
    cache.set(value, result);

    return result + " (New Result)";
  };
}

const memorizeResult = memorize((n) => n * 2);

// console.log(memorizeResult(2));
// console.log(memorizeResult(2));
// console.log(memorizeResult(3));

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////

// --7 Compose

function compose(...fns) {
  return function (num) {
    const res = fns.reduceRight((acc, curr) => {
      console.log(acc);
      console.log(curr(acc));
      console.log("--------------------------------");
      return curr(acc);
    }, num);

    return res;
  };
}

function add2(x) {
  return x + 2;
}

function multiplyBy3(x) {
  return x * 3;
}

function subtract1(x) {
  return x - 2;
}

const composeResult = compose(subtract1, multiplyBy3, add2);

// console.log(composeResult(5));

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////

// --8 flattenArray
// (recursion)

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////

// --9 createSecretHolder

function createCounter(num) {
  let count = num;
  return function () {
    return (num = num + 1);
  };
}
const counter = createCounter(10);
// console.log(counter());
// console.log(counter());

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////

// --10 Protect private data using closures. (createSecretHolder)

function createSecretHolder(secret) {
  let private = secret;

  return {
    get() {
      return private;
    },
    change(newValue) {
      private = newValue;
      return private;
    },
  };
}

// Can only get the secret value by "get" and change it by "change"
const secret = createSecretHolder("123");

// console.log(secret.get());
// console.log(secret.change(2));
// console.log(secret.get());

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////

// --12 Create async pipeline utility. (pipeAsync)

function pipeAsync(...fns) {
  return async function (num) {
    let total = num;
    for (const fn of fns) {
      total = await fn(total);
    }

    return total;
  };
}

function add5(x) {
  return x + 5;
}

function multiplyBy5(x) {
  return x * 5;
}

function subtract5(x) {
  return x - 5;
}

const pipeline = pipeAsync(add5, multiplyBy5, subtract5);

pipeline(5).then(console.log);
