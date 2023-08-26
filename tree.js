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

    insert(dataToAdd, root = this.root) {
        if (root === null) {
            root = new Node(dataToAdd);
            return root;
        }

        if (dataToAdd < root.data) {
            root.left = this.insert(dataToAdd, root.left);
        } else if (dataToAdd > root.data) {
            root.right = this.insert(dataToAdd, root.right);
        }

        return root;
    }

    delete(dataToRemove, root = this.root) {
        if (root === null) {
            return root;
        }

        // find node to be deleted
        if (dataToRemove < root.data) {
            root.left = this.delete(dataToRemove, root.left);
            return root;
        } else if (dataToRemove > root.data) {
            root.right = this.delete(dataToRemove, root.right);
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

    find(dataToFind, root = this.root) {
        if (root === null || root.data === dataToFind) {
            return root;
        }

        if (dataToFind < root.data) {
            return this.find(dataToFind, root.left);
        } else if (dataToFind > root.data) {
            return this.find(dataToFind, root.right);
        }
    }

    // iteration
    levelOrder(func = null, root = this.root) {
        if (root === null) {
            return root;
        }
        let resultOrder = [];
        let queue = [];
        queue.push(root);
        while (queue.length > 0) {
            let currentNode = queue.shift();
            resultOrder.push(currentNode);
            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
        }
        return resultOrder;
    }

    // root, left, right
    preorder(root = this.root) {
        let resultOrder = [];

        function dfs(root) {
            if (root === null) {
                return root;
            }
            resultOrder.push(root);
            dfs(root.left);
            dfs(root.right);
        }

        dfs(root);
        return resultOrder;
    }

    // left, root, right
    inorder(root = this.root) {
        let resultOrder = [];

        function dfs(root) {
            if (root === null) {
                return root;
            }
            dfs(root.left);
            resultOrder.push(root);
            dfs(root.right);
        }

        dfs(root);
        return resultOrder;
    }

    // left, right, root
    postorder(root = this.root) {
        let resultOrder = [];

        function dfs(root) {
            if (root === null) {
                return root;
            }
            dfs(root.left);
            dfs(root.right);
            resultOrder.push(root);
        }

        dfs(root);
        return resultOrder;
    }

    height(root = this.root) {
        if (root === null) {
            return -1; // Height of an empty tree is -1
        }
    
        const leftHeight = this.height(root.left);
        const rightHeight = this.height(root.right);
    
        return Math.max(leftHeight, rightHeight) + 1;
    }

     depth(root = this.root, node, depth = 0) {
        if (root === null) {
            return -1; // Node not found
        }
    
        if (root.data === node.data) {
            return depth;
        }
    
        const leftDepth = getDepth(root.left, node, depth + 1);
        if (leftDepth !== -1) {
            return leftDepth;
        }
    
        const rightDepth = getDepth(root.right, node, depth + 1);
        return rightDepth;
     }
    
    isBalanced(root = this.root) {
        if (root === null) {
            return true; // an empty tree is balanced
        }

        const leftHeight = this.height(root.left);
        const rightHeight = this.height(root.right);

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return false;
        }

        return this.isBalanced(root.left) && this.isBalanced(root.right);
    }

    rebalance(root = this.root) {
        if (this.root === null) return;
        let treeNodes = this.inorder();
        let dataInNodes = [];

        treeNodes.forEach(node => {
            dataInNodes.push(node.data);
        });

        this.root = this.buildTree(dataInNodes, 0, dataInNodes.length - 1);
    }
}