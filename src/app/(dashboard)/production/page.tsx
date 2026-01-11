"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_BATCHES } from "@/lib/mockData";
import { Search, Plus, Factory } from "lucide-react";
import { useState } from "react";

export default function ProductionPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredBatches = MOCK_BATCHES.filter(batch =>
        batch.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        batch.product.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Production Management</h2>
                    <p className="text-muted-foreground">Monitor active batches and production schedules.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create Batch
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Batches</CardTitle>
                        <Factory className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-muted-foreground">In progress & queued</p>
                    </CardContent>
                </Card>
                {/* Add more stats cards here if needed (e.g. Efficiency, Output Today) */}
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Batch Schedule</CardTitle>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search Batch ID or Product..."
                                className="flex h-10 w-[300px] rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Batch ID</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Product</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Quantity</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Schedule</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Progress</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {filteredBatches.map((batch) => (
                                    <tr key={batch.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <td className="p-4 align-middle font-medium">{batch.id}</td>
                                        <td className="p-4 align-middle">{batch.product}</td>
                                        <td className="p-4 align-middle text-right">{batch.quantity.toLocaleString()}</td>
                                        <td className="p-4 align-middle">
                                            <Badge variant={
                                                batch.status === 'Completed' ? 'success' :
                                                    batch.status === 'In Progress' ? 'default' :
                                                        batch.status === 'Quality Check' ? 'warning' :
                                                            'secondary'
                                            }>
                                                {batch.status}
                                            </Badge>
                                        </td>
                                        <td className="p-4 align-middle text-muted-foreground text-xs">
                                            {batch.startDate} - {batch.endDate}
                                        </td>
                                        <td className="p-4 align-middle w-[150px]">
                                            <div className="h-2 w-full rounded-full bg-secondary">
                                                <div
                                                    className="h-full rounded-full bg-primary transition-all"
                                                    style={{ width: `${batch.progress}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-muted-foreground">{batch.progress}%</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
