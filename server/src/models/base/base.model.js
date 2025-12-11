import mongoose from "mongoose";

/**
 * Base schema with common fields for all models
 */
export const baseSchemaFields = {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }
};

/**
 * Base model methods
 */
export const baseModelMethods = {
    /**
     * Soft delete a document
     */
    async softDelete() {
        this.isDeleted = true;
        this.deletedAt = new Date();
        return await this.save();
    },

    /**
     * Restore a soft-deleted document
     */
    async restore() {
        this.isDeleted = false;
        this.deletedAt = null;
        return await this.save();
    }
};

/**
 * Base model static methods
 */
export const baseModelStatics = {
    /**
     * Find all active (non-deleted) documents
     */
    findActive(filter = {}) {
        return this.find({ ...filter, isDeleted: false });
    },

    /**
     * Find one active document
     */
    findOneActive(filter = {}) {
        return this.findOne({ ...filter, isDeleted: false });
    },

    /**
     * Find by ID (active only)
     */
    findByIdActive(id) {
        return this.findOne({ _id: id, isDeleted: false });
    }
};

/**
 * Middleware to update updatedAt on save
 */
export const updateTimestampMiddleware = function (schema) {
    schema.pre('save', function (next) {
        this.updatedAt = new Date();
        next();
    });

    schema.pre('findOneAndUpdate', function (next) {
        this.set({ updatedAt: new Date() });
        next();
    });
};

/**
 * Apply base functionality to a schema
 */
export function applyBaseModel(schema) {
    // Add base fields
    schema.add(baseSchemaFields);

    // Add instance methods
    Object.keys(baseModelMethods).forEach(method => {
        schema.methods[method] = baseModelMethods[method];
    });

    // Add static methods
    Object.keys(baseModelStatics).forEach(method => {
        schema.statics[method] = baseModelStatics[method];
    });

    // Apply middleware
    updateTimestampMiddleware(schema);
}

export default {
    baseSchemaFields,
    baseModelMethods,
    baseModelStatics,
    updateTimestampMiddleware,
    applyBaseModel
};
