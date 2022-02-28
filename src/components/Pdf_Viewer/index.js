import React, { useState } from 'react'
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer
} from "@react-pdf/renderer";
import { useNavigate, useLocation } from 'react-router-dom';
// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: "#fff",
        color: "black"
    },
    section: {
        margin: 5,
        padding: 10
    },
    viewer: {
        width: '100%', //the pdf viewer will take up all of the width and height
        height: window.innerHeight
    }
});

// Create Document Component
const Doctor_Pdf_Viewer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div>

            <PDFViewer style={styles.viewer}>
                {/* Start of the document*/}
                <Document>
                    {/*render a single page*/}
                    <Page size="A4" style={styles.page}>
                        <View style={{ flexDirection: "row", border: "1px solid gray" }}>
                            <View style={styles.section}>
                                <Text>ID</Text>
                            </View>
                            <View style={styles.section}>
                                <Text>Full Name</Text>
                            </View>
                            <View style={styles.section}>
                                <Text>Date</Text>
                            </View>
                            <View style={styles.section}>
                                <Text>Time</Text>
                            </View>
                            <View style={styles.section}>
                                <Text>Status</Text>
                            </View>
                            <View style={styles.section}>
                                <Text>Channel</Text>
                            </View>
                            <View style={styles.section}>
                                <Text>Mode</Text>
                            </View>
                            <View style={styles.section}>
                                <Text>Payment</Text>
                            </View>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
}
export default Doctor_Pdf_Viewer;
