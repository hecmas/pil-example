# Basic Chip Arithmetization using PIL

This repository leverages the Polygon zkEVM tool stack to implement a chip that performs modular operations.

## Repository Overview

Overview of the main files and directories in this repository:
- `components/`: Contains the arithmetization and the executor of the different components of the chip.
  - `global/`: Contains the constant trace used across the multiple components.
  - `main`: Defines the chip’s behavior.
  - `module`: Implements the modular operations.


## Prerequisites

### Node.js

Ensure you have a recent LTS version of Node.js installed.

To check the installed version of Node.js, run:
```bash
node -v
```

If you need to install or update Node.js, follow the instructions [here](https://nodejs.org/en/download/package-manager).

### Install Dependencies

Before running the tests, you’ll need to install the required dependencies. Navigate to the project directory and run:
```bash
npm install
```

## Running Tests

To execute the full test suite, use the following command:
```bash
npm run test:main
```

This command will compile the PIL files, generate the trace, verify that constraints are satisfied by the generated trace, compute the full proof, and verify it.

You can find partial tests in the [package.json](https://github.com/hecmas/pil-example/blob/main/package.json) file.

