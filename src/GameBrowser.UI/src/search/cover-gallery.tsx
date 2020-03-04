import * as React from 'react';
import { noop } from '../util';

export interface CoverGalleryProps {
    imageUrls: string[];
    coverIndex: number;

    moveLeftClicked(): void;
    moveRightClicked(): void;
}

export function CoverGallery(props: CoverGalleryProps) {
    const { imageUrls, coverIndex, moveLeftClicked, moveRightClicked } = props;
    const imageEls = imageUrls
        .map((x, i) => {
            // how to make this look right:
            // - the keys are essential to react reusing elements, which allows the native css transitions
            // - the cover in the center needs to be in front of the rest (zIndex = covers + 1)
            // - each left cover needs to be in front of the one before it (zIndex = i)
            // - each right cover needs to be in front on the one after it (zIndex = covers - i)
            // - the first left and right of center need to have some distance to prevent clipping
            //   through the center while they transition (distanceFromCenterCover)
            // - the ends of the list fade out / in (opacity)
            // - the bouncy ease must not go too far forward or back, otherwise covers will clip at the
            //   ends of their bounces

            const distanceFromCenterCover = 150;
            const distanceBetweenSides = 50;
            const coverAngle = 75;
            const sideCoversToShow = 3;

            let transform = `perspective(500px) translateZ(0) translateX(0) rotateY(0)`;
            let zIndex = imageUrls.length + 1;
            let onClick = noop;
            let opacity = 1;
            let pointer = '';

            // right of center
            if (i > coverIndex) {
                if (i > coverIndex + sideCoversToShow) {
                    opacity = 0
                }
                pointer = 'cursor-pointer';
                onClick = moveRightClicked;
                zIndex = imageUrls.length - i;
                const offset = (i - coverIndex) * distanceBetweenSides + distanceFromCenterCover;
                transform = `perspective(500px) translateX(${offset}px) translateZ(-100px) rotateY(-${coverAngle}deg)`;
            }

            // left of center
            if (i < coverIndex) {
                if (i < coverIndex - sideCoversToShow) {
                    opacity = 0
                }
                pointer = 'cursor-pointer';
                onClick = moveLeftClicked;
                zIndex = i;
                const offset = (coverIndex - i) * distanceBetweenSides + distanceFromCenterCover;
                transform = `perspective(500px) translateX(-${offset}px) translateZ(-100px) rotateY(${coverAngle}deg)`;
            }

            return <img
                onClick={onClick}
                key={x}
                className={`m-3 bouncy-ease absolute ${pointer}`}
                style={{ transform, zIndex, opacity }}
                src={x}
            />;
        });

    return <div className='flex-auto'>
        <div className='flex justify-center items-center overflow-hidden relative' style={{ minHeight: '500px', minWidth: '450px' }}>
            {imageEls}
        </div>
        <div className='flex text-2xl text-white justify-around'>
            <button className='w-full mx-3 rounded bg-black hover:bg-teal-400 border-2 border-black focus:border-teal-400' onClick={moveLeftClicked}>←</button>
            <button className='w-full mx-3 rounded bg-black hover:bg-teal-400 border-2 border-black focus:border-teal-400' onClick={moveRightClicked}>→</button>
        </div>
    </div>;
}