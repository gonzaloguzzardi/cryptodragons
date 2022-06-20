import { ReactElement } from 'react'
import { MDXRemote } from 'next-mdx-remote'
import Button from '@mui/material/Button'
import Image from 'next/image'
import Typography from '@mui/material/Typography';

const components = {
  Button,
  h1: props => <Typography gutterBottom variant="h1" {...props}/>,
  h2: props => <Typography gutterBottom variant="h2" {...props}/>,
  h3: props => <Typography gutterBottom variant="h3" {...props}/>,
  h4: props => <Typography gutterBottom variant="h4" {...props}/>,
  h5: props => <Typography gutterBottom variant="h5" {...props}/>,
  img: props => <Image {...props} />,
  p: props => <Typography gutterBottom variant="p" {...props}/>,
}

export default function MDXRenderer({ ...rest }): ReactElement {
  /* @ts-ignore */
  return <MDXRemote components={components} {...rest} />
}
