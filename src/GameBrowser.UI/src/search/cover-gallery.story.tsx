import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { CoverGallery, CoverGalleryProps } from './cover-gallery';
import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs';

storiesOf('CoverGallery', module)
    .add('Usage', () => {
        const coverIndex = number('coverIndex', 2);

        return <CoverGallery
            imageUrls={[
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co1te2.jpg',
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wox.jpg',
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tf3.jpg',
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co1te2.jpg',
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tdv.jpg'
            ]}
            coverIndex={coverIndex}
            moveLeftClicked={action('moveLeftClicked')}
            moveRightClicked={action('moveRightClicked')}
        />;
    })
