import { Card } from "@/components/ui/card";
// Placeholder for charts
// import { Overview } from "@/components/features/dashboard/Overview"; 

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>

            {/* Stats Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Total Revenue", value: "$45,231.89", sub: "+20.1% from last month" },
                    { title: "Active Batches", value: "23", sub: "+4 new today" },
                    { title: "Low Stock Items", value: "12", sub: "Requires attention" },
                    { title: "Pending Orders", value: "573", sub: "+201 since last hour" },
                ].map((stat, i) => (
                    <div key={i} className="rounded-xl border bg-card text-card-foreground shadow p-6">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">{stat.title}</h3>
                        </div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground pt-1">{stat.sub}</p>
                    </div>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow p-6">
                    <h3 className="font-semibold leading-none tracking-tight mb-4">Production Overview</h3>
                    <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center rounded text-muted-foreground">
                        [Chart Component Placeholder]
                    </div>
                </div>
                <div className="col-span-3 rounded-xl border bg-card text-card-foreground shadow p-6">
                    <h3 className="font-semibold leading-none tracking-tight mb-4">Recent Activity</h3>
                    <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center rounded text-muted-foreground">
                        [Activity List Placeholder]
                    </div>
                </div>
            </div>
        </div>
    );
}
