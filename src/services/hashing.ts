// Imports Node's crypto module to create hashes.
import crypto from "crypto";

// Defines a consistent hashing ring for mapping keys to nodes.
class ConsistentHashRing<TNode extends string = string> {
  // Stores each node by its hash position on the ring.
  private ring = new Map<number, TNode>();

  // Keeps hash positions sorted so lookups can find the next node clockwise.
  private sortedHashes: number[] = [];

  // Converts any string value into a numeric hash position.
  private hash(value: string): number {
    // Creates an MD5 hash from the input value and returns it as hexadecimal text.
    const hex = crypto.createHash("md5").update(value).digest("hex");

    // Use first 8 hex chars (32 bits) for simplicity. 
    // The 16 means: Interpret this as hexadecimal.
    return parseInt(hex.substring(0, 8), 16);
  }

  // Adds a node to the hash ring.
  addNode(node: TNode) {
    // Calculates the node's hash position.
    const hash = this.hash(node);

    // Stores the node at its hash position.
    this.ring.set(hash, node);

    // Adds the hash position to the sorted list.
    this.sortedHashes.push(hash);

    // Sorts hash positions so lookups can scan them in ring order.
    this.sortedHashes.sort((a, b) => a - b);
  }

  // Removes a node from the hash ring.
  removeNode(node: TNode) {
    // Calculates the same hash position used when the node was added.
    const hash = this.hash(node);

    // Removes the node from the ring map.
    this.ring.delete(hash);

    // Removes the node's hash position from the sorted list.
    this.sortedHashes = this.sortedHashes.filter(h => h !== hash);
  }

  // Finds which node should handle the given key.
  getNode(key: string): TNode {
    // Calculates the key's hash position on the ring.
    const keyHash = this.hash(key);

    // Walks through sorted node hashes to find the first node after the key.
    for (const nodeHash of this.sortedHashes) {
      // Uses this node if its position is clockwise from the key position.
      if (keyHash <= nodeHash) {
        // Returns the node stored at the matching hash position.
        return this.ring.get(nodeHash)!;
      }
    }

    // wrap around
    return this.ring.get(this.sortedHashes[0]!)!;
  }
}

// Exports the hash ring class for use in other files.
export {ConsistentHashRing};
