import Tree from "./tree.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};



let array = [];
for (let i = 0; i < 10; i++) {
    array.push(Math.floor(Math.random() * (100 - 1)));
}
let tree = new Tree(array);

prettyPrint(tree.root);
console.log(tree.isBalanced());
let arr1 = tree.preorder();
let arr2 = tree.postorder();
let arr3 = tree.inorder();
function displayTreeOrder(arr) {
    let dataInArr = [];
    arr.forEach(item => {
        dataInArr.push(item.data);
    });
    console.log(dataInArr);
}
displayTreeOrder(arr1);
displayTreeOrder(arr2);
displayTreeOrder(arr3);
tree.insert(101);
tree.insert(150);
tree.insert(297);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
arr1 = tree.preorder();
arr2 = tree.postorder();
arr3 = tree.inorder();
displayTreeOrder(arr1);
displayTreeOrder(arr2);
displayTreeOrder(arr3);