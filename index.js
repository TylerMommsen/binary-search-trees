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

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let BST = new Tree(array);

prettyPrint(BST.root);

// let arr = BST.levelOrder();
// let arr = BST.preorder();
// let arr = BST.inorder();
let arr = BST.postorder();
let dataInArr = [];

arr.forEach(item => {
    dataInArr.push(item.data);
});
console.log(dataInArr);