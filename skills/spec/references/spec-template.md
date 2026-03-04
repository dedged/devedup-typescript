# Spec: [Feature/Module Name]

**Plan:** [Link to plan]
**Date:** YYYY-MM-DD
**Status:** draft | approved | implemented

## Overview

[1-2 paragraph description of this module/feature]

## Data Models

Define all data models using TypeScript interfaces for type definitions and Zod
schemas for runtime validation. Example format:

    interface ExampleModel {
      /** What this field represents */
      fieldName: string;
      /** Default: 0 */
      count: number;
    }

    const ExampleModelSchema = z.object({
      fieldName: z.string(),
      count: z.number().default(0),
    });

## Interface Contracts

Document each public function or API endpoint:

### `functionName(param: Type): ReturnType`

- **Description:** What it does
- **Parameters:**
  - `param` (Type): description
- **Returns:** ReturnType — description
- **Throws:**
  - `ValidationError`: when...
  - `NotFoundError`: when...

## Behavior Specifications

### Scenario: [Name]

- **Given:** [precondition]
- **When:** [action]
- **Then:** [expected result]

### Scenario: [Name]

- **Given:** [precondition]
- **When:** [action]
- **Then:** [expected result]

## Error Handling Matrix

| Error Condition | Error Type | HTTP Status | User Message |
|-----------------|------------|-------------|--------------|
|                 |            |             |              |

## Dependencies

- **Internal:** [modules this depends on]
- **External:** [packages/services]
