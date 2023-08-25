import Node from "./node.js";

export default class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr, 0, arr.length - 1);
    }

    buildTree(arr, start, end) {
        if (start > end) return null;
        let mid = parseInt((start + end) / 2);
        let root = new Node(arr[mid]);

        root.left = this.buildTree(arr, start, mid - 1);
        root.right = this.buildTree(arr, mid + 1, end);

        return root;
    }

    insert(root, data) {
        if (root === null) {
            root = new Node(data);
            return root;
        }

        if (data < root.data) {
            root.left = this.insert(root.left, data);
        } else if (data > root.data) {
            root.right = this.insert(root.right, data);
        }

        return root;
    }

    delete(root, dataToRemove) {
        if (root === null) {
            return root;
        }

        // find node to be deleted
        if (dataToRemove < root.data) {
            root.left = this.delete(root.left, dataToRemove);
            return root;
        } else if (dataToRemove > root.data) {
            root.right = this.delete(root.right, dataToRemove);
            return root;
        }
        
        // found node to be deleted, now check children
        if (root.left === null) {
            return root.right;
        } else if (root.right === null) {
            return root.left;
        } else { // if both children exist
            let succParent = root;

            // find successor
            let succ = root.right;
            while (succ.left !== null) {
                succParent = succ;
                succ = succ.left;
            }

            if (succParent !== root) {
                succParent.left = succ.right;
            } else {
                succParent.right = succ.right;
            }

            root.data = succ.data;

            return root;
        }
    }
}