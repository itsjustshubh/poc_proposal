import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Card, CardContent, Typography, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Alert, useTheme, Tooltip } from '@mui/material';
import { IconProps, TrashSimple } from 'phosphor-react';

interface DropBoxProps {
  title: string;
  description: string;
  icon: React.ElementType<IconProps>;
  accept: string[];
  maxFiles: number;
  maxWidth?: number;
  maxHeight?: number;
  height?: number;
  width?: number;
  onDrop?: (files: File[]) => void;
}

const DropBox: React.FC<DropBoxProps> = ({ title, description, icon: Icon, accept, maxFiles, maxWidth = 400, maxHeight = 300, height, width, onDrop }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const filteredFiles = acceptedFiles.filter(file => accept.includes(file.type));
    if (filteredFiles.length !== acceptedFiles.length) {
      setError(`Some files were rejected. Please upload only ${accept.join(', ')} files.`);
    } else if (files.length + filteredFiles.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} files.`);
    } else {
      setFiles((prevFiles) => [...prevFiles, ...filteredFiles]);
      setError(null);
      if (onDrop) {
        onDrop(filteredFiles);
      }
    }
  }, [files, accept, maxFiles, onDrop]);

  const handleRemoveFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter(file => file.name !== fileName));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: accept.reduce((acc, mime) => ({ ...acc, [mime]: [] }), {}), // convert array to accept object
  });

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 275,
        maxWidth: width || maxWidth,
        maxHeight: height || maxHeight,
        margin: 2,
        padding: 2,
        backgroundColor: '#eb8c00',
        transition: 'border-color 0.3s, background-color 0.3s',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: isDragActive ? `0 0 10px ${theme.palette.primary.main}` : 'none',
        borderRadius: 10,
      }}
      {...getRootProps()}
    >
      <CardContent>
        <input {...getInputProps()} />
        <Box display="flex" alignItems="center" mb={2}>
          <Tooltip title={description} arrow>
            <IconButton size="large" sx={{ color: 'white', mr: 1 }}>
              <Icon size={32} weight="fill" />
            </IconButton>
          </Tooltip>
          <Typography variant="h5" component="div" fontWeight="600" color={'white'}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" mb={2} align='center' color={'white'}>
          {description}
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {files.length > 0 && (
          <List>
            {files.map((file) => (
              <ListItem key={file.name}>
                <ListItemText primary={file.name} primaryTypographyProps={{ color: 'white' }} />
                <ListItemSecondaryAction>
                  <Tooltip title="Remove file" arrow>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFile(file.name)}>
                      <TrashSimple size={20} weight="fill" color={'white'} />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default DropBox;
