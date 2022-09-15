---
sidebar_position: 2
id: "bridge-security"
---


# Bridge Security

## Types of Security

There are a few different types of important security in the bridging ecosystem, each asking a specific question:

1. **Economic Security.** How much does it cost to corrupt the system?
   
2. **Implementation Security.** How complex is the system to implement? What does the security hygiene of implementers look like?
   
3. **Environmental Security.** How can the system withstand attacks on underlying domains?

## Security of Different Bridge Protocols

### Economic Security

To maximize economic security, protocols must maximize the size and diversity of their validator to increase the cost and complexity of bribes.

| Bridge Type             | Corruption Costs           |
| ----------------------- | --------------------------------- |
| `External`     | `k-of-m of the external verifiers of the system` |
| `Native`       | `k-of-n of the underlying domain validators`                            |
| `Local`        | `2-of-2 counterparties`                    |
| `Optimistic`   | `m-of-m of the watchers in the system`     |

Externally validated bridges have the lowest economic security, while natively verified bridges have the highest security.

### Implementation Security

To maximize implementation security, protocols should be incredibly simple and easy to implement.

| Bridge Type             | Complexity       |
| ----------------------- | --------------------------------- |
| `External`     | `Medium (requires offchain coordination)`  |
| `Native`       | `High (requires custom implementations)`   |
| `Local`        | `Medium (requires offchain coordination)`  |
| `Optimistic`   | `Low (standalone, portable components)`    |

While natively verified bridges have a high degree of economic security, their lack of extensibility increases the implementation complexity substantially.

In addition to keeping the protocol simple, implementation risk can be constrained by:

- Following secure development practices (contract audits, fuzzing, etc.)
- Native mechanisms to prevent and deter fraud (slashing, watchers, pausability, etc.)

### Environmental Security

Bridges act as an oracle of information between chains, and must be able to preserve the integrity of state between chains with differing security thresholds (i.e. prevent 51% attacks from impacting multiple domains). While these types of attacks are difficult to detect onchain, they are trivial to detect offchain. 

To constrain environment risk, protocols should use latency to their advantage to allow system relayers to detect and respond to these types of attacks.

| Bridge Type             | Latency as a safety mechanism   |
| ----------------------- | --------------------------------- |
| `External`     | `Possible, but not required.`  |
| `Native`       | `Not possible, uses state directly.`   |
| `Local`        | `Possible, but at the expense of prolonged user lockups.`  |
| `Optimistic`   | `Exists, fraud windows are built-in`    |

