import React, { useState } from "react";
import { Dialog, DialogContent, DialogContentText, DialogTitle, TextField, Slide, Select, FormControl, Button, IconButton, Grid, InputLabel, Radio, Typography, Paper, Link } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

import {UploadServiceImage} from '../../../Apis/Clinic_Services/index';

export default function Clinic_Service_Image({ show, handleCloseEditmodal,data }) {
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [file, setfile] = useState();

    const fetchClinicservices = async () => {
        
        const formdata =  new FormData();
        formdata.append("file", file);
        formdata.append("id", data.id);
        const add_service = await UploadServiceImage(formdata);

        let parse = JSON.parse(add_service);
        if (parse.success === "200") {
            alert(parse.message);
            window.location.reload()
        }
    }

    return (
        <>
            <Dialog
                open={show}
                onClose={handleCloseEditmodal}
                maxWidth={maxWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Grid container>
                    <Grid item xs={12} style={{ borderRight: '1px solid #F0F0F0', width: 700 }}>
                        <Typography variant="h5" style={{ margin: 42, marginLeft: 20, position:'relative',bottom:15, color: '#2C7FB2' }} noWrap={true}>Upload Clinic Service</Typography>
                        <IconButton edge="start" color="inherit" onClick={handleCloseEditmodal} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0', position: "relative", bottom: 100 }}>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap={true} style={{
                            fontSize: 16,
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            color: '#707070',
                            fontWeight: 600,
                            alignItems: 'center',
                            marginTop: 105,
                            marginLeft: 135
                        }}>
                            Logo:
                        </Typography>


                        <center>
                            <FormControl variant="outlined"   >
                                <TextField id="outlined-basic" name="file" type="file" enctype="multipart/form-data" size="small" label="" onChange={e => {const file=e.target.files[0];setfile(file)}} variant="outlined" style={{ width: '100%', marginLeft: 23, position: 'relative', bottom: 29 }} />
                            </FormControl>
                        </center>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid xs={12} sm={6}>
                        <Button onClick={handleCloseEditmodal} style={{ marginLeft: 203, marginTop: 35, color: 'white', backgroundColor: '#2C7FB2', borderRadius: 28, width: 130, textTransform: 'capitalize' }}>Cancel
                        </Button>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <Button  onClick={fetchClinicservices} style={{ margin: 70, marginLeft: 25, marginBottom: 14, position: "relative", bottom: 35, color: 'white', backgroundColor: '#2C7FB2', borderRadius: 28, width: 130, textTransform: 'capitalize' }}>Submit
                        </Button>

                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}







