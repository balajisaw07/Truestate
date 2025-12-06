const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const Sale = require('../models/Sale');

const CSV_PATH = path.join(__dirname, '../../../truestate_assignment_dataset.csv');
const BATCH_SIZE = 5000;

async function importData() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Check if data already exists
        const existingCount = await Sale.countDocuments();
        if (existingCount > 0) {
            console.log(`Database already has ${existingCount} records.`);
            const readline = require('readline');
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            const answer = await new Promise(resolve => {
                rl.question('Do you want to clear and reimport? (yes/no): ', resolve);
            });
            rl.close();

            if (answer.toLowerCase() !== 'yes') {
                console.log('Import cancelled.');
                process.exit(0);
            }

            console.log('Clearing existing data...');
            await Sale.deleteMany({});
        }

        console.log('Starting CSV import...');
        const records = [];
        let totalProcessed = 0;
        let batchCount = 0;

        const stream = fs.createReadStream(CSV_PATH)
            .pipe(csv());

        for await (const row of stream) {
            // Parse tags from comma-separated quoted string
            let tags = [];
            if (row['Tags']) {
                tags = row['Tags'].replace(/"/g, '').split(',').map(t => t.trim());
            }

            const record = {
                transactionId: parseInt(row['Transaction ID']) || 0,
                date: new Date(row['Date']),
                customerId: row['Customer ID'],
                customerName: row['Customer Name'],
                phoneNumber: row['Phone Number'],
                gender: row['Gender'],
                age: parseInt(row['Age']) || 0,
                customerRegion: row['Customer Region'],
                customerType: row['Customer Type'],
                productId: row['Product ID'],
                productName: row['Product Name'],
                brand: row['Brand'],
                productCategory: row['Product Category'],
                tags: tags,
                quantity: parseInt(row['Quantity']) || 0,
                pricePerUnit: parseFloat(row['Price per Unit']) || 0,
                discountPercentage: parseFloat(row['Discount Percentage']) || 0,
                totalAmount: parseFloat(row['Total Amount']) || 0,
                finalAmount: parseFloat(row['Final Amount']) || 0,
                paymentMethod: row['Payment Method'],
                orderStatus: row['Order Status'],
                deliveryType: row['Delivery Type'],
                storeId: row['Store ID'],
                storeLocation: row['Store Location'],
                salespersonId: row['Salesperson ID'],
                employeeName: row['Employee Name']
            };

            records.push(record);
            totalProcessed++;

            // Insert in batches
            if (records.length >= BATCH_SIZE) {
                batchCount++;
                console.log(`Inserting batch ${batchCount} (${totalProcessed} records processed)...`);
                await Sale.insertMany(records, { ordered: false });
                records.length = 0;
            }

            // Progress update every 50000 records
            if (totalProcessed % 50000 === 0) {
                console.log(`Progress: ${totalProcessed} records processed...`);
            }
        }

        // Insert remaining records
        if (records.length > 0) {
            console.log(`Inserting final batch (${records.length} records)...`);
            await Sale.insertMany(records, { ordered: false });
        }

        console.log(`\nImport completed! Total records imported: ${totalProcessed}`);

        // Create indexes
        console.log('Creating indexes...');
        await Sale.createIndexes();
        console.log('Indexes created successfully.');

        process.exit(0);
    } catch (error) {
        console.error('Import error:', error);
        process.exit(1);
    }
}

importData();
