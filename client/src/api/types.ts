/**
 * TypeScript types for API requests and responses
 */

// Common types
export interface PaginationParams {
    page?: number;
    limit?: number;
}

export interface PaginationResponse {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
    pagination: PaginationResponse;
}

// User types
export interface User {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    phone: string;
    avatar?: string;
    birthday?: string;
    company?: string;
    address?: string;
    roleId: Role | string;
    isVerified: boolean;
    createdAt: string;
}

export interface Role {
    _id: string;
    name: string;
}

// Damage Report types
export interface DamageReport {
    _id: string;
    userId: User | string;
    images: string[];
    status: 'Pending' | 'Processing' | 'Completed';
    aiResult?: AIResult;
    assessorId?: User | string;
    createdAt: string;
    updatedAt: string;
}

export interface AIResult {
    type: 'classification' | 'detection' | 'segmentation';
    classes?: Array<{
        name: string;
        confidence: number;
    }>;
    confidence?: number;
    maskPixelCount?: number;
    maskArea_m2?: number;
}

// Cost Estimate types
export interface RepairItem {
    partName: string;
    action: string;
    unit: string;
    quantity: number;
    unitCost: number;
    laborHours: number;
    laborRatePerHour: number;
    totalCost: number;
}

export interface CostEstimate {
    _id: string;
    damageReportId: string;
    createdBy?: string;
    ai?: AIResult;
    repairItems: RepairItem[];
    subTotal: number;
    tax: number;
    discount: number;
    totalEstimate: number;
    notes?: string;
    status: 'Draft' | 'PendingApproval' | 'Approved' | 'Rejected';
    createdAt: string;
}

// Manual Assessment types
export interface ManualAssessment {
    _id: string;
    damageReportId: string;
    assessorId: string;
    findings: string;
    recommendations?: string;
    createdAt: string;
}

// Notification types
export interface Notification {
    _id: string;
    userId: string;
    message: string;
    type: string;
    relatedId?: string;
    isRead: boolean;
    createdAt: string;
}

// Admin Dashboard types
export interface DashboardStats {
    assessmentsThisMonth: number;
    assessmentsTrend: string;
    completionRate: string;
    avgProcessingTime: string;
    totalCosts: number;
    costsTrend: string;
}

export interface WeeklyData {
    _id: number;
    count: number;
}

export interface DamageTypeData {
    _id: string;
    count: number;
}

export interface DashboardData {
    stats: DashboardStats;
    weeklyData: WeeklyData[];
    damageTypes: DamageTypeData[];
    recentAssessments: DamageReport[];
}

// Assessor Queue types
export interface QueueItem extends Omit<DamageReport, 'images'> {
    aiConfidence: number;
    aiDamages: number;
    estimatedCost: number;
    images: number; // Number of images instead of array
    waitTime: string;
    priority?: 'high' | 'medium' | 'low';
}

export interface AssessorStats {
    totalAssessments: number;
    completedAssessments: number;
    inProgress: number;
    avgCompletionTime: string;
    completionRate: string;
}

export interface AccuracyMetrics {
    aiAgreement: number;
    avgConfidence: number;
    improvementRate: number;
}

export interface AssessorStatsData {
    stats: AssessorStats;
    assessmentsOverTime: Array<{ _id: string; count: number }>;
    accuracyMetrics: AccuracyMetrics;
}

// Filter types
export interface UserFilters extends PaginationParams {
    search?: string;
    roleId?: string;
    isVerified?: boolean;
}

export interface AssessmentFilters extends PaginationParams {
    status?: string;
    assessorId?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
}

export interface QueueFilters extends PaginationParams {
    priority?: string;
    status?: string;
    sortBy?: string;
}

// Request types
export interface UpdateUserRequest {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    avatar?: string;
    birthday?: string;
    company?: string;
    address?: string;
    roleId?: string;
}

export interface SubmitReviewRequest {
    manualAssessment?: {
        findings: string;
        recommendations?: string;
    };
    costEstimate?: Partial<CostEstimate>;
}
