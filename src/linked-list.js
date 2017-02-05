const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        const node = new Node(data);
        if (this.isEmpty()) {
            this._head = node;
            this._tail = node;
        } else {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }

        this.length++;
        return this;

    }

    head() {
        if (this._head !== null) {
            return this._head.data;
        } else {
            return null;
        }

    }

    tail() {
        if (this._tail !== null) {
            return this._head.data;
        } else {
            return null;
        }
    }

    at(index) {

        var nd = this._head;
        for (let i = 0; i < this.length; i++) {
            if (i === index) {
                return nd.data;
            } else {
                nd = nd.next;
            }
        }
    }

    insertAt(index, data) {
        if (index == 0) {
            let ndIns = new Node(data);
            this._head.prev = ndIns;
            ndIns.next = this._head;
            this._head = ndIns;
            this.length++;
        } else if (index == this.length) {
            this.append(data);
        } else {
            let curNd = this._head;
            for (let i = 0; i < this.length; i++) {
                if (i === index) {
                    let ndIns = new Node(data);
                    ndIns.next = curNd;
                    ndIns.prev = curNd.prev;
                    curNd.prev.next = ndIns;
                    curNd.prev = ndIns;
                    this.length++;
                    return;
                } else {
                    curNd = curNd.next;
                }
            }
        }
    }

    isEmpty() {
        if (this.length === 0) {
            return true
        } else {
            return false
        }
    }

    clear() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    deleteAt(index) {
        var currentNode = this._head,
            _length = this.length,
            count = 1,
            message = { failure: 'Failure: non-existent node in this list.' },
            afterNodeToDelete = null,
            beforeNodeToDelete = null,
            nodeToDelete = null,
            deletedNode = null;

        if (_length === 0 || index < 1 || index > _length) {
            throw new Error(message.failure);
        }

        if (index === 1) {
            this._head = currentNode.next;

            if (!this._head) {
                this._head.previous = null;
            } else {
                this._tail = null;
            }

        } else if (index === _length) {
            this._tail = this._tail.previous;
            this._tail.next = null;
        } else {
            while (count < index) {
                currentNode = currentNode.next;
                count++;
            }

            beforeNodeToDelete = currentNode.previous;
            nodeToDelete = currentNode;
            afterNodeToDelete = currentNode.next;

            beforeNodeToDelete.next = afterNodeToDelete;
            afterNodeToDelete.previous = beforeNodeToDelete;
            deletedNode = nodeToDelete;
            nodeToDelete = null;
        }

        this.length--;

        return message.success;
    }

    reverse() {}

    indexOf(data) {
        var nd = this._head;
        for (let i = 0; i < this.length; i++) {
            if (nd.data === data) {
                return i;
            } else {
                nd = nd.next;
            }
        }
        return -1;
    }
}

module.exports = LinkedList;
