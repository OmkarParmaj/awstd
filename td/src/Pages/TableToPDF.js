import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const TableToPDF = () => {

    const generatePDF = () => {
        const doc = new jsPDF();

        // Add a title
        doc.setFontSize(18);
        doc.text('Beaminward Report Document', 14, 22);

        // Add a paragraph
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam vel risus suscipit interdum.',
            14,
            30,
            { maxWidth: 180 }
        );

       
        doc.text(
            'Artificial intelligance is awsome natural language processing is main content in ai and machine learning',
            14,
            50,
            { maxWidth: 180 }
        );

        // Get table element
        const table = document.getElementById('dataTable');
        const tableRows = [];
        const tableHeaders = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent);

        // Extract table data
        table.querySelectorAll('tbody tr').forEach(row => {
            const rowData = Array.from(row.querySelectorAll('td')).map(td => td.textContent);
            tableRows.push(rowData);
        });

        // Generate PDF table
        autoTable(doc, {
            head: [tableHeaders],
            body: tableRows,
            startY: 70, // Starting Y position for the table
            theme: 'grid',
            // headStyles: { fillColor: [22, 160, 133] },
            margin: { top: 40 },
        });

        // Save the PDF
        doc.save('beaminward_report.pdf');
    };

    return (
        <div>
            <button onClick={generatePDF} className="btn btn-primary">
                Generate PDF
            </button>
            <div className="table-container">
                <table id="dataTable" className='table table-bordered text-center'>
                    <thead>
                        <tr>
                            <th>SR NO</th>
                            <th>DATE</th>
                            <th>SET NO</th>
                            <th>DESIGN NO</th>
                            <th>SIZING MTR</th>
                            <th>FABRIC DISPATCH</th>
                            <th>BEAM STATUS</th>
                            <th>PERCENTAGE</th>
                            <th>STATUS</th>
                            <th>RECONSILATION</th>
                            <th>DAYS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 10 }, (_, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{new Date().toLocaleDateString()}</td>
                                <td>{`SetNo-${index + 1}`}</td>
                                <td>{`DesignNo-${index + 1}`}</td>
                                <td>{(Math.random() * 100).toFixed(2)}</td>
                                <td>{(Math.random() * 100).toFixed(2)}</td>
                                <td>{`Status ${index + 1}`}</td>
                                <td>{(Math.random() * 100).toFixed(2)}</td>
                                <td>{(Math.random() * 100).toFixed(2) < 85 ? 'FABRIC PENDING' : 'FABRIC OK'}</td>
                                <td><a href={`/reconsilation/${index + 1}`} >View {index + 1}</a></td>
                                <td>{(Math.random() * 10).toFixed(0)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableToPDF;
