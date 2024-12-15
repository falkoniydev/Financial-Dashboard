export const exportToCSV = (data: any[], filename: string) => {
	const csvContent = [
		Object.keys(data[0]).join(","), // Header
		...data.map((item) => Object.values(item).join(",")), // Rows
	].join("\n");

	const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = `${filename}.csv`;
	link.click();
};
